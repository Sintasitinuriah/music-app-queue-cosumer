class Listener {
    constructor(musicService, mailSender) {
      this._musicService = musicService;
      this._mailSender = mailSender;
   
      this.listen = this.listen.bind(this);
    }
   
    async listen(message) {
      try {
        const { userId, targetEmail } = JSON.parse(message.content.toString());
        
        const music = await this._musicService.getMusic(userId);
        const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(music));
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  }
   
  module.exports = Listener;