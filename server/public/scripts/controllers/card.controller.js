myApp.controller('CardController', function (CardService, UserService) {
  console.log('CardController created');
  var self = this;
  self.userService = UserService;
  self.cardService = CardService;
  self.userObject = UserService.userObject;
  self.usersCards = CardService.usersCards;
  self.types = ['Villain', 'Environment', 'Item', 'Creature', 'Goal'];
  self.url = { url: '' };
  self.description = '';
  self.addACard = function () {
    return CardService.addACard(self.type, self.description, self.url.url, self.saveToPirateverse);
  };
  // FILESTACK
  self.pick = function () {
    CardService.fileStack.pick({
      accept: ['image/*'],
      //imageMax: [600, 400]]
      //fromSources: ['imagesearch'],
    }).then(result => {
      //console.log(JSON.stringify(result.filesUploaded));
      console.log(result);

      self.url.url = result.filesUploaded[0].url;
    });
  }
  
  //Adam's code
  // CardService.fileStack.pick().then((result) => {
  //   console.log('result', result);
  //   let convertedUrl = 'https://cdn.filestackcontent.com/' + 
  //                       'resize=w:200,h:200,f:crop/' +
  //                       result.filesUploaded[0].handle;
  //   CardService.editCurrentUser(self.userObject.userName,  convertedUrl);
  // })



  //const link = document.getElementById('url');

  //const client = filestack.init('YOUR API KEY');

  // client.pick({
  //      accept: 'image/*',
  // }).then(function(result) {
  //   const fileUrl = result.filesUploaded[0].url; 
  //   link.href=fileUrl; 
  //   link.innerHTML=fileUrl;
  // });

}); //used with settings, about, addAcard, user
