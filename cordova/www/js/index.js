/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events ar:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {

        // Action sur le bouton partger
        $('.shareEvent').click(function(){

            // Cache les messages précedents + loader
            $('.loaderAction .success').hide();
            $('.loaderAction .error').hide();
            $('.loaderAction .img').show();

            // envoie du message
            sendSMS(null, $('.titleOneResult .itemTitle').html());
        });

        // Envoie d'SMS
        function sendSMS(contact, title){

          // Retour success
          var SendSuccess = function () { 

            // Affiche le message de success
            $('.loaderAction[rel=share] .error').hide();
            $('.loaderAction[rel=share] .img').hide();
            $('.loaderAction[rel=share] .success').show();
          }

          // Retour error
          var sendError = function () { 

            // Affiche le message d'erreur
            $('.loaderAction[rel=share] .success').hide();
            $('.loaderAction[rel=share] .img').hide();
            $('.loaderAction[rel=share] .error').show();
          }

          // Construction du message
          var mySMS = title+' du '+formattedDate(new Date($('#du').val()))+' au '+formattedDate(new Date($('#au').val()));

          // Partage vers la messagerie native
          window.plugins.socialsharing.shareViaSMS(mySMS, null, SendSuccess, sendError);

        }

        // Format pour les dates
        function formattedDate(date) {

          // Récupération
          var month = String(date.getMonth() + 1);
          var day = String(date.getDate());
          var year = String(date.getFullYear());

          // Ajout du 0
          if (month.length < 2) 
            month = '0' + month;

          // Ajout du 0
          if (day.length < 2) 
            day = '0' + day;

          return day+'/'+month+'/'+year;
        }


        // Action sur le bouton Agenda
        $('.addCalendar').click(function(){

          // Cache les messages précedents + loader
          $('.loaderAction .success').hide();
          $('.loaderAction .error').hide();
          $('.loaderAction .img').show();

          // Récupération
          var startDate = new Date($('#du').val());
          var endDate = new Date($('#au').val());
          var title = $('.titleOneResult .itemTitle').html();

          // Retour success
          var success = function() { 

            // Affiche le message de success
            $('.loaderAction[rel=calendar] .error').hide();
            $('.loaderAction[rel=calendar] .img').hide();
            $('.loaderAction[rel=calendar] .success').show();
          }

          // Retour error
          var error = function() { 

            // Affiche le message d'erreur
            $('.loaderAction[rel=calendar] .success').hide();
            $('.loaderAction[rel=calendar] .img').hide();
            $('.loaderAction[rel=calendar] .error').show();
          }

          // Ajout sur l'agenda
          window.plugins.calendar.createEvent(title,null,null,startDate,endDate,success,error);
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }
};

app.initialize();