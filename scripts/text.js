// import {inputTextBox} from "./index.js"
import {Speaker} from "./speech.js"
import {addMessage} from "./message.js"

import LexicalAnalyser from "./lexer.js"
import Parser from "./parser.js"

// Create a new text evaluator
/**
 * 
 * @param {string} text 
 * 
 * @returns {TextEvaluator}
 */
export default function createTextEvaluator(text){
    var textEvaluator = new TextEvaluator(text)
    textEvaluator.checkEvaluator()

    return textEvaluator
}

export class TextEvaluator{
    constructor(userInput){
        this.userInput = userInput
        this.result = this.getResult()

        this.startReply()
    }

    checkEvaluator() {
        console.log(this.userInput)
    }

    getResult() {
        var tokens = new LexicalAnalyser(this.userInput).startUserDataParsing()
        var parser = new Parser(tokens)

        return parser.parser()
    }

    // clear the input box after
    // a timeout
    static clearInputBox(textInput){
        setTimeout(function() {
            textInput.value = ""
        },1)
    }

    startReply(){
        var speaker = new Speaker(this.result)
        speaker.speak()
        addMessage(this.result)
        console.log(speaker)
    }
}