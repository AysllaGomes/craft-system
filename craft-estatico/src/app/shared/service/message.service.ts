import { Injectable } from '@angular/core';

import { vsprintf } from 'sprintf-js';

import { Message } from './model/message.model';

@Injectable() export class MessageService {

  constructor() {}

  getMessage(message: string, params = []) {
    // @ts-ignore
    const messageNew = Message.messages[message];

    return vsprintf(messageNew, params);
  }

}
