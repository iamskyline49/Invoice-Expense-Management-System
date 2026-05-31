import { Injectable } from '@nestjs/common';

const Pusher = require('pusher');

@Injectable()
export class PusherService {
  private pusher: any;

  constructor() {
    this.pusher = new Pusher({
      appId: '2156401',

      key: '65934a37501cf42d40e9',

      secret: '13c506079c2abdb2ab61',

      cluster: 'ap1',

      useTLS: true,
    });
  }

  async triggerTaskAssigned(username: string, taskTitle: string) {
    await this.pusher.trigger(
      'task-channel',

      'task-assigned',

      {
        message: `New task assigned to ${username}`,

        taskTitle,
      },
    );
  }
}
