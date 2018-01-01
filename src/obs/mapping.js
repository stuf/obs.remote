import * as L from 'partial.lenses';

export const PROTOCOL_VERSION = '4.1.0';

export const Scene = {

};

export const SwitchScenes = {
  name: 'scene-name',
  sources: ['sources', L.valueOr([])]
};

export const PreviewSceneChanged = {};
