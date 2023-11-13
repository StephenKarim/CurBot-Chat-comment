// Importing constants and utility functions from the specified paths
import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const';
import {
  cleanData,
  isExportFormatV1,
  isExportFormatV2,
  isExportFormatV3,
  isExportFormatV4,
  isLatestExportFormat,
} from '@/utils/app/importExport';

// Importing export format types and OpenAI model types
import { ExportFormatV1, ExportFormatV2, ExportFormatV4 } from '@/types/export';
import { OpenAIModelID, OpenAIModels } from '@/types/openai';

import { describe, expect, it } from 'vitest';

// Describing test cases for export format functions
describe('Export Format Functions', () => {
  describe('isExportFormatV1', () => {
    it('should return true for v1 format', () => {
      const obj = [{ id: 1 }];
      expect(isExportFormatV1(obj)).toBe(true);
    });

    it('should return false for non-v1 formats', () => {
      const obj = { version: 3, history: [], folders: [] };
      expect(isExportFormatV1(obj)).toBe(false);
    });
  });

  // Testing isExportFormatV2 function
  describe('isExportFormatV2', () => {
    it('should return true for v2 format', () => {
      const obj = { history: [], folders: [] };
      expect(isExportFormatV2(obj)).toBe(true);
    });

    it('should return false for non-v2 formats', () => {
      const obj = { version: 3, history: [], folders: [] };
      expect(isExportFormatV2(obj)).toBe(false);
    });
  });

  // Testing isExportFormatV3 function
  describe('isExportFormatV3', () => {
    it('should return true for v3 format', () => {
      const obj = { version: 3, history: [], folders: [] };
      expect(isExportFormatV3(obj)).toBe(true);
    });

    it('should return false for non-v3 formats', () => {
      const obj = { version: 4, history: [], folders: [] };
      expect(isExportFormatV3(obj)).toBe(false);
    });
  });

  // Testing isExportFormatV4 function
  describe('isExportFormatV4', () => {
    it('should return true for v4 format', () => {
      const obj = { version: 4, history: [], folders: [], prompts: [] };
      expect(isExportFormatV4(obj)).toBe(true);
    });

    it('should return false for non-v4 formats', () => {
      const obj = { version: 5, history: [], folders: [], prompts: [] };
      expect(isExportFormatV4(obj)).toBe(false);
    });
  });
});

// Describing test cases for cleanData function
describe('cleanData Functions', () => {
  describe('cleaning v1 data', () => {
    it('should return the latest format', () => {
      const data = [
        {
          id: 1,
          name: 'conversation 1',
          messages: [
            {
              role: 'user',
              content: "what's up ?",
            },
            {
              role: 'assistant',
              content: 'Hi',
            },
          ],
        },
      ] as ExportFormatV1;
      const obj = cleanData(data);
      expect(isLatestExportFormat(obj)).toBe(true);
      expect(obj).toEqual({
        version: 4,
        history: [
          {
            id: 1,
            name: 'conversation 1',
            messages: [
              {
                role: 'user',
                content: "what's up ?",
              },
              {
                role: 'assistant',
                content: 'Hi',
              },
            ],
            model: OpenAIModels[OpenAIModelID.GPT_3_5],
            prompt: DEFAULT_SYSTEM_PROMPT,
            temperature: DEFAULT_TEMPERATURE,
            folderId: null,
          },
        ],
        folders: [],
        prompts: [],
      });
    });
  });
// Cleaning v2 data and checking for the latest format
  describe('cleaning v2 data', () => {
    it('should return the latest format', () => {
      const data = {
        history: [
          {
            id: '1',
            name: 'conversation 1',
            messages: [
              {
                role: 'user',
                content: "what's up ?",
              },
              {
                role: 'assistant',
                content: 'Hi',
              },
            ],
          },
        ],
        folders: [
          {
            id: 1,
            name: 'folder 1',
          },
        ],
      } as ExportFormatV2;
      const obj = cleanData(data);
      expect(isLatestExportFormat(obj)).toBe(true);
      expect(obj).toEqual({
        version: 4,
        history: [
          {
            id: '1',
            name: 'conversation 1',
            messages: [
              {
                role: 'user',
                content: "what's up ?",
              },
              {
                role: 'assistant',
                content: 'Hi',
              },
            ],
            model: OpenAIModels[OpenAIModelID.GPT_3_5],
            prompt: DEFAULT_SYSTEM_PROMPT,
            temperature: DEFAULT_TEMPERATURE,
            folderId: null,
          },
        ],
        folders: [
          {
            id: '1',
            name: 'folder 1',
            type: 'chat',
          },
        ],
        prompts: [],
      });
    });
  });
// Cleaning v4 data and checking for the latest format
  describe('cleaning v4 data', () => {
    it('should return the latest format', () => {
      const data = {
        version: 4,
        history: [
          {
            id: '1',
            name: 'conversation 1',
            messages: [
              {
                role: 'user',
                content: "what's up ?",
              },
              {
                role: 'assistant',
                content: 'Hi',
              },
            ],
            model: OpenAIModels[OpenAIModelID.GPT_3_5],
            prompt: DEFAULT_SYSTEM_PROMPT,
            temperature: DEFAULT_TEMPERATURE,
            folderId: null,
          },
        ],
        folders: [
          {
            id: '1',
            name: 'folder 1',
            type: 'chat',
          },
        ],
        prompts: [
          {
            id: '1',
            name: 'prompt 1',
            description: '',
            content: '',
            model: OpenAIModels[OpenAIModelID.GPT_3_5],
            folderId: null,
          },
        ],
      } as ExportFormatV4;

      const obj = cleanData(data);
      expect(isLatestExportFormat(obj)).toBe(true);
      // Checking if the cleaned data matches the expected format
      expect(obj).toEqual({
        version: 4,
        history: [
          {
            id: '1',
            name: 'conversation 1',
            messages: [
              {
                role: 'user',
                content: "what's up ?",
              },
              {
                role: 'assistant',
                content: 'Hi',
              },
            ],
            model: OpenAIModels[OpenAIModelID.GPT_3_5],
            prompt: DEFAULT_SYSTEM_PROMPT,
            temperature: DEFAULT_TEMPERATURE,
            folderId: null,
          },
        ],
        folders: [
          {
            id: '1',
            name: 'folder 1',
            type: 'chat',
          },
        ],
        prompts: [
          {
            id: '1',
            name: 'prompt 1',
            description: '',
            content: '',
            model: OpenAIModels[OpenAIModelID.GPT_3_5],
            folderId: null,
          },
        ],
      });
    });
  });
});
