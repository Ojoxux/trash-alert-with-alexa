import { SkillBuilders } from 'ask-sdk-core';
import { LaunchRequestHandler } from './handlers/LaunchRequest';
import { TodayTrashIntentHandler } from './handlers/TodayTrashIntent';

export const handler = SkillBuilders.custom()
  .addRequestHandlers(LaunchRequestHandler, TodayTrashIntentHandler)
  .lambda();
