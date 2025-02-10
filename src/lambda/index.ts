import {
  RequestHandler,
  HandlerInput,
  SkillBuilders,
  ErrorHandler,
} from 'ask-sdk-core';

// スキル起動時のハンドラ
const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput: HandlerInput) {
    const speechText =
      'Trash Alertへようこそ。今日のゴミの日情報をお知らせします。';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

// ユーザーから「今日のゴミは？」と聞かれた際のハンドラ
const TodayTrashIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'TodayTrashIntent'
    );
  },
  handle(handlerInput: HandlerInput) {
    // 実際には日付やスケジュールに基づくロジックを利用します
    const todaySchedule = getTodayTrashSchedule();
    const speechText = `今日は${todaySchedule}のゴミを出してください。`;
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  },
};

function getTodayTrashSchedule(): string {
  // この例では固定値を返しています。
  // 必要に応じて、日付や外部API/DBから取得するロジックに変更してください。
  return '燃えるゴミ';
}

// ヘルプインテントのハンドラ
const HelpIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
    );
  },
  handle(handlerInput: HandlerInput) {
    const speechText =
      '今日のゴミ情報を知りたい場合は「今日のゴミは？」と聞いてください。';
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

// エラーハンドラ
const errorHandler: ErrorHandler = {
  canHandle(handlerInput: HandlerInput, error: Error) {
    return true;
  },
  handle(handlerInput: HandlerInput, error: Error) {
    console.error(`エラー発生: ${error.message}`);
    return handlerInput.responseBuilder
      .speak('申し訳ありません。何か問題が発生しました。')
      .getResponse();
  },
};

export const handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    TodayTrashIntentHandler,
    HelpIntentHandler
  )
  .addErrorHandlers(errorHandler)
  .lambda();
