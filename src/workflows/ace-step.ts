export function aceStep() {
  return {
    "prompt": {
  "14": {
    "inputs": {
      "tags": "Indian, heavy male vocals, kawaii pop, indian classical",
      "lyrics": "[inst]\n\n[verse]\nMere sap non ki rani kab aayegi tu\n...\n...\nAayi rut mastaani kab aayegi tu\nBeeti jaaye zindagaani kab aayegi tu\nChali aa, tu chali aa\n\nChali aa, haan tu chali aa\n[inst]\n\n\n\n",
      "lyrics_strength": 0.9900000000000002,
      "clip": [
        "40",
        1
      ]
    },
    "class_type": "TextEncodeAceStepAudio",
    "_meta": {
      "title": "TextEncodeAceStepAudio"
    }
  },
  "17": {
    "inputs": {
      "seconds": 90,
      "batch_size": 1
    },
    "class_type": "EmptyAceStepLatentAudio",
    "_meta": {
      "title": "EmptyAceStepLatentAudio"
    }
  },
  "18": {
    "inputs": {
      "samples": [
        "52",
        0
      ],
      "vae": [
        "40",
        2
      ]
    },
    "class_type": "VAEDecodeAudio",
    "_meta": {
      "title": "VAEDecodeAudio"
    }
  },
  "40": {
    "inputs": {
      "ckpt_name": "ace_step_v1_3.5b.safetensors"
    },
    "class_type": "CheckpointLoaderSimple",
    "_meta": {
      "title": "Load Checkpoint"
    }
  },
  "44": {
    "inputs": {
      "conditioning": [
        "14",
        0
      ]
    },
    "class_type": "ConditioningZeroOut",
    "_meta": {
      "title": "ConditioningZeroOut"
    }
  },
  "49": {
    "inputs": {
      "model": [
        "51",
        0
      ],
      "operation": [
        "50",
        0
      ]
    },
    "class_type": "LatentApplyOperationCFG",
    "_meta": {
      "title": "LatentApplyOperationCFG"
    }
  },
  "50": {
    "inputs": {
      "multiplier": 1.0000000000000002
    },
    "class_type": "LatentOperationTonemapReinhard",
    "_meta": {
      "title": "LatentOperationTonemapReinhard"
    }
  },
  "51": {
    "inputs": {
      "shift": 5.000000000000001,
      "model": [
        "40",
        0
      ]
    },
    "class_type": "ModelSamplingSD3",
    "_meta": {
      "title": "ModelSamplingSD3"
    }
  },
  "52": {
    "inputs": {
      "seed": 851442497278067,
      "steps": 50,
      "cfg": 5,
      "sampler_name": "euler",
      "scheduler": "simple",
      "denoise": 1,
      "model": [
        "49",
        0
      ],
      "positive": [
        "14",
        0
      ],
      "negative": [
        "44",
        0
      ],
      "latent_image": [
        "17",
        0
      ]
    },
    "class_type": "KSampler",
    "_meta": {
      "title": "KSampler"
    }
  },
  "59": {
    "inputs": {
      "filename_prefix": "audio/ComfyUI",
      "quality": "V0",
      "audioUI": "",
      "audio": [
        "18",
        0
      ]
    },
    "class_type": "SaveAudioMP3",
    "_meta": {
      "title": "Save Audio (MP3)"
    }
  }
}
}
}