
        class InteractiveChatbox {
    constructor(a, b, c) {
        this.args = {
            button: a,
            chatbox: b
        }
        this.icons = c;
        this.state = false; 
    }

    display() {
        const {button, chatbox} = this.args;
        
        button.addEventListener('click', () => this.toggleState(chatbox))
    }

    toggleState(chatbox) {
        this.state = !this.state;
        this.showOrHideChatBox(chatbox, this.args.button);
    }

    showOrHideChatBox(chatbox, button) {
        if(this.state) {
            chatbox.classList.add('chatbox--active')
            this.toggleIcon(true, button);
        } else if (!this.state) {
            chatbox.classList.remove('chatbox--active')
            this.toggleIcon(false, button);
        }
    }

    toggleIcon(state, button) {
        const { isClicked, isNotClicked } = this.icons;
        let b = button.children[0].innerHTML;

        if(state) {
            button.children[0].innerHTML = isClicked; 
        } else if(!state) {
            button.children[0].innerHTML = isNotClicked;
        }
    }
}


const chatButton = document.querySelector('.chatbox__button');
const chatContent = document.querySelector('.chatbox__support');
const icons = {
    isClicked: '<img src="./images/icons/chatbox-icon.svg" />',
    isNotClicked: '<img src="./images/icons/chatbox-icon.svg" />'
}
const chatbox = new InteractiveChatbox(chatButton, chatContent, icons);
chatbox.display();
chatbox.toggleIcon(false, chatButton);


    const userMessage = [
      ["favorite restaurant"],
      ["pizza restaurant recommendation"],
      ["sushi restaurant recommendation"],

    ];

    const botReply = [
     ["Sure, I recommend trying out 'The Gourmet Delight'. They have a great menu!"],
      ["For the best pizza, I suggest 'Pizza Paradise'. They have delicious pizzas!"],
      ["Absolutely! 'Sushi Haven' is known for its amazing sushi dishes. Check it out!"]
    ];

    const alternative = [
      "Same here, dude.",
      "That's cool! Go on...",
      "Dude...",
      "Ask something else...",
      "Hey, I'm listening..."
    ];

    const synth = window.speechSynthesis;

    function voiceControl(string) {
      let u = new SpeechSynthesisUtterance(string);
      u.text = string;
      u.lang = "en-aus";
      u.volume = 1;
      u.rate = 1;
      u.pitch = 1;
      synth.speak(u);
    }

    function sendMessage() {
      const inputField = document.getElementById("input");
      let input = inputField.value.trim();
      input !== "" && output(input);
      inputField.value = "";
    }

    document.addEventListener("DOMContentLoaded", () => {
      const inputField = document.getElementById("input");
      inputField.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
          let input = inputField.value.trim();
          input !== "" && output(input);
          inputField.value = "";
        }
      });
    });

    function output(input) {
      let product;

      let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

      text = text
        .replace(/[\W_]/g, " ")
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .trim();

      let comparedText = compare(userMessage, botReply, text);

      product = comparedText
        ? comparedText
        : alternative[Math.floor(Math.random() * alternative.length)];
      addChat(input, product);
    }

    function compare(triggerArray, replyArray, string) {
      let item;
      for (let x = 0; x < triggerArray.length; x++) {
        for (let y = 0; y < replyArray.length; y++) {
          if (triggerArray[x][y] == string) {
            items = replyArray[x];
            item = items[Math.floor(Math.random() * items.length)];
          }
        }
      }
      if (item) return item;
      else return containMessageCheck(string);
    }

    function containMessageCheck(string) {
      let expectedReply = [
        ["Good Bye, dude", "Bye, See you!", "Dude, Bye. Take care of your health in this situation."],
        ["yeah, I know"],
        ["Good Night, dude", "Have a sound sleep", "Sweet dreams"],
        ["Have a pleasant evening!", "Good evening too", "Evening!"],
        ["Good morning, Have a great day!", "Morning, dude!"],
        ["Good Afternoon", "Noon, dude!", "Afternoon, dude!"]
      ];
      let expectedMessage = [
        ["bye", "tc", "take care"],
        ["Do you know this restaurant?"],
        ["night", "good night"],
        ["evening", "good evening"],
        ["morning", "good morning"],
        ["noon"]
      ];
      let item;
      for (let x = 0; x < expectedMessage.length; x++) {
        if (expectedMessage[x].includes(string)) {
          items = expectedReply[x];
          item = items[Math.floor(Math.random() * items.length)];
        }
      }
      return item;
    }

    function addChat(input, product) {
      const mainDiv = document.getElementById("message-section");
      let userDiv = document.createElement("div");
      userDiv.id = "user";
      userDiv.classList.add("message");
      userDiv.innerHTML = `<span id="user-response">${input}</span>`;
      mainDiv.appendChild(userDiv);

      let botDiv = document.createElement("div");
      botDiv.id = "bot";
      botDiv.classList.add("message");
      botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
      mainDiv.appendChild(botDiv);
      var scroll = document.getElementById("message-section");
      scroll.scrollTop = scroll.scrollHeight;
      voiceControl(product);
    }

    function toggleChat() {
      const chatPopup = document.getElementById('chatPopup');
      chatPopup.style.display = (chatPopup.style.display === 'none' || chatPopup.style.display === '') ? 'block' : 'none';
    }
