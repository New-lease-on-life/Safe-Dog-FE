// Module-level store — persists within the server process (suitable for demo/mock)
// global 객체를 사용해 Next.js dev 환경의 hot reload로 인한 초기화를 방지합니다.

type StoredTemplate = {
  petId: number;
  careType: string;
  title: string;
  content: string;
  careTypeDescription: string;
};

declare global {
  // eslint-disable-next-line no-var
  var __careStoreTemplates: StoredTemplate[] | undefined;
}

// global에 없으면 초기화, 있으면 기존 배열 재사용
if (!global.__careStoreTemplates) {
  global.__careStoreTemplates = [];
}

const storedTemplates = global.__careStoreTemplates;

export const careStore = {
  save: (templates: StoredTemplate[]) => {
    const incoming = new Set(templates.map((t) => `${t.petId}:${t.careType}`));
    const filtered = storedTemplates.filter(
      (t) => !incoming.has(`${t.petId}:${t.careType}`),
    );
    storedTemplates.length = 0;
    storedTemplates.push(...filtered, ...templates);
  },
  getForPet: (petId: number): StoredTemplate[] => {
    return storedTemplates.filter((t) => t.petId === petId);
  },
  // 디버깅용
  getAll: (): StoredTemplate[] => [...storedTemplates],
};
