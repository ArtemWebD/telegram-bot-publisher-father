import TelegramBot, { PhotoSize, Message } from 'node-telegram-bot-api';
import config from 'config';
import https from 'https';
import { TgBot } from '../bot/bot.decorator';

export interface IFile {
  mimetype: string;
  filename?: string;
  data: Buffer;
}

/**
 * The class allows you to process the received user files into an object containing a mimetype and buffer
 */
@TgBot
export default class FileParser {
  private readonly bot: TelegramBot;

  public async parse(
    file:
      | (Message['video'] | Message['voice'] | Message['audio'] | Message['document'])
      | PhotoSize[],
  ): Promise<IFile | undefined> {
    try {
      if (file instanceof Array) {
        return this.parsePhoto(file);
      }
      return this.parseFile(file);
    } catch (error) {
      console.log(error);
    }
  }

  private async parsePhoto(photoSize: PhotoSize[]) {
    const id = photoSize[0].file_id;
    return this.getFile(id, 'image/jpeg');
  }

  private parseFile(
    file: Message['video'] | Message['voice'] | Message['audio'] | Message['document'],
  ) {
    if (!file) {
      return undefined;
    }
    const id = file.file_id;
    //@ts-ignore
    return this.getFile(id, file.mime_type || 'application/octet-stream', file?.file_name);
  }

  private async getFile(
    id: string,
    mimetype: string,
    filename?: string,
  ): Promise<IFile | undefined> {
    try {
      const { file_path } = await this.bot.getFile(id);
      const { token } = config.get('Bot');
      const data = await new Promise<Buffer>((resolve, reject) => {
        https.get(`https://api.telegram.org/file/bot${token}/${file_path}`, (res) => {
          const chunks: number[] = [];
          res.on('data', (data: Buffer) => {
            chunks.push(...Array.from(data));
          });
          res.on('end', () => resolve(Buffer.from(chunks)));
          res.on('error', (err) => reject(err));
        });
      });
      return { mimetype, data, filename };
    } catch (error) {
      console.log(error);
    }
  }
}
