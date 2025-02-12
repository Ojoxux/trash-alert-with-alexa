import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { getTodayTrashSchedule } from '../services/trashSchedule';

export const TodayTrashIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'TodayTrashIntent'
    );
  },
  async handle(handlerInput: HandlerInput) {
    try {
      const timestamp = handlerInput.requestEnvelope.request.timestamp;
      const todaySchedule = await getTodayTrashSchedule(timestamp);
      const today = new Date(timestamp);
      const dateStr = today.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      });

      const speechText = `${dateStr}です。今日は${todaySchedule}を出してください。収集時間は午前8時までです。`;

      return handlerInput.responseBuilder.speak(speechText).getResponse();
    } catch (error) {
      console.error('Error:', error);
      const errorText = 'ゴミ収集情報の取得中にエラーが発生しました。';

      return handlerInput.responseBuilder.speak(errorText).getResponse();
    }
  },
};
