import { BasicCareType, DiseaseCareType } from "./type";

type TimeSlot = "MORNING" | "LUNCH" | "EVENING" | "CUSTOM";
type FoodType = "DRY" | "WET" | "MIXED";
type RepeatUnit = "DAY" | "MONTH" | "YEAR";

export interface ApiCareTemplateItem {
  itemName: string | null;
  foodType: FoodType | null;
  amount: number | null;
  amountUnit: string | null;
  imageUrl: string | null;
  sortOrder: number;
}

export interface ApiCareTemplate {
  careType: string;
  title: string | null;
  timeSlot: TimeSlot | null;
  customTimeSlot: string | null;
  repeatCycleValue: number | null;
  repeatCycleUnit: RepeatUnit | null;
  repeatStartDate: string | null;
  urineTrackingOn: boolean;
  fecesTrackingOn: boolean;
  weightRequestOn: boolean;
  memo: string | null;
  items: ApiCareTemplateItem[];
}

const BASE_TEMPLATE: Omit<ApiCareTemplate, "careType"> = {
  title: null,
  timeSlot: null,
  customTimeSlot: null,
  repeatCycleValue: null,
  repeatCycleUnit: null,
  repeatStartDate: null,
  urineTrackingOn: false,
  fecesTrackingOn: false,
  weightRequestOn: false,
  memo: null,
  items: [],
};

const BASE_ITEM: ApiCareTemplateItem = {
  itemName: null,
  foodType: null,
  amount: null,
  amountUnit: null,
  imageUrl: null,
  sortOrder: 0,
};

const TIME_SLOT_MAP: Record<string, TimeSlot> = {
  아침: "MORNING",
  점심: "LUNCH",
  저녁: "EVENING",
};

const FOOD_TYPE_MAP: Record<string, FoodType> = {
  건사료: "DRY",
  습식: "WET",
  혼합급여: "MIXED",
};

export const DISEASE_LABEL_MAP: Record<DiseaseCareType, string> = {
  heart: "심장병",
  kidney: "신장질환",
  cancer: "암",
  eye: "안과질환",
  cushing: "쿠싱",
  arthritis: "관절염",
  other: "기타질병",
};

function toTimeSlot(time: string): {
  timeSlot: TimeSlot;
  customTimeSlot: string | null;
} {
  const slot = TIME_SLOT_MAP[time];
  return slot
    ? { timeSlot: slot, customTimeSlot: null }
    : { timeSlot: "CUSTOM", customTimeSlot: time };
}

function toAmountUnit(unit: string, customUnit: string): string | null {
  if (unit === "직접입력") return customUnit || null;
  return unit || null;
}

function fromMeal(data: unknown): ApiCareTemplate[] {
  const records = data as Array<{
    time: string;
    feeds: Array<{ id: string; type: string | null; name: string }>;
    amounts: Record<
      string,
      { amount: string; unit: string; customUnit: string }
    >;
  }>;
  if (!Array.isArray(records) || records.length === 0) return [];
  return records.map((record) => ({
    ...BASE_TEMPLATE,
    careType: "MEAL",
    ...toTimeSlot(record.time),
    items: record.feeds.map((feed, i) => {
      const amt = record.amounts[feed.id];
      return {
        ...BASE_ITEM,
        foodType: feed.type ? (FOOD_TYPE_MAP[feed.type] ?? null) : null,
        itemName: feed.name || null,
        amount: amt ? Number(amt.amount) || null : null,
        amountUnit: amt ? toAmountUnit(amt.unit, amt.customUnit) : null,
        sortOrder: i,
      };
    }),
  }));
}

function fromSnack(data: unknown): ApiCareTemplate[] {
  const item = data as { name: string; count: string } | null;
  if (!item) return [];
  return [
    {
      ...BASE_TEMPLATE,
      careType: "SNACK",
      items: [
        {
          ...BASE_ITEM,
          itemName: item.name || null,
          amount: Number(item.count) || 1,
          amountUnit: "개",
        },
      ],
    },
  ];
}

function fromSupplement(data: unknown): ApiCareTemplate[] {
  const record = data as {
    time: string;
    item: { name: string; count: string };
  } | null;
  if (!record) return [];
  return [
    {
      ...BASE_TEMPLATE,
      careType: "SUPPLEMENT",
      ...toTimeSlot(record.time),
      items: [
        {
          ...BASE_ITEM,
          itemName: record.item.name || null,
          amount: Number(record.item.count) || 1,
          amountUnit: "개",
        },
      ],
    },
  ];
}

function fromMedicine(data: unknown): ApiCareTemplate[] {
  if (!data) return [];
  const { registered, note } = data as {
    registered: { time: string; item: { name: string; count: string } } | null;
    note: string;
  };
  if (!registered) return [];
  return [
    {
      ...BASE_TEMPLATE,
      careType: "MEDICATION",
      ...toTimeSlot(registered.time),
      memo: note || null,
      items: [
        {
          ...BASE_ITEM,
          itemName: registered.item.name || null,
          amount: Number(registered.item.count) || 1,
          amountUnit: "알",
        },
      ],
    },
  ];
}

function fromPad(data: unknown): ApiCareTemplate[] {
  if (!data) return [];
  const { urineUsed, fecesUsed } = data as {
    urineUsed: boolean;
    fecesUsed: boolean;
  };
  return [
    {
      ...BASE_TEMPLATE,
      careType: "EXCRETION",
      urineTrackingOn: urineUsed,
      fecesTrackingOn: fecesUsed,
    },
  ];
}

function fromWater(data: unknown): ApiCareTemplate[] {
  const records = data as Array<{
    time: string;
    amount: string;
    unit: string;
    customUnit: string;
  }>;
  if (!Array.isArray(records) || records.length === 0) return [];
  return records.map((record) => ({
    ...BASE_TEMPLATE,
    careType: "WATER",
    ...toTimeSlot(record.time),
    items: [
      {
        ...BASE_ITEM,
        amount: Number(record.amount) || null,
        amountUnit: toAmountUnit(record.unit, record.customUnit),
      },
    ],
  }));
}

function fromWalk(data: unknown): ApiCareTemplate[] {
  const records = data as Array<{
    time: string;
    duration: string;
    note: string;
  }>;
  if (!Array.isArray(records) || records.length === 0) return [];
  return records.map((record) => ({
    ...BASE_TEMPLATE,
    careType: "WALK",
    ...toTimeSlot(record.time),
    memo: record.note || null,
    items: [
      {
        ...BASE_ITEM,
        amount: Number(record.duration) || null,
        amountUnit: "분",
      },
    ],
  }));
}

function fromWeight(data: unknown): ApiCareTemplate[] {
  if (!data) return [];
  const { requested } = data as { requested: boolean };
  return [{ ...BASE_TEMPLATE, careType: "WEIGHT", weightRequestOn: requested }];
}

function fromDisease(
  diseaseKey: DiseaseCareType,
  data: unknown,
): ApiCareTemplate[] {
  if (!data) return [];
  const { items, memo } = data as {
    items: Array<{ label: string; checked: boolean }>;
    memo: string;
  };
  return [
    {
      ...BASE_TEMPLATE,
      careType: "DISEASE_CARE",
      title: DISEASE_LABEL_MAP[diseaseKey],
      memo: memo || null,
      items: items.map((item, i) => ({
        ...BASE_ITEM,
        itemName: item.label,
        sortOrder: i,
      })),
    },
  ];
}

const BASIC_TRANSFORMERS: Partial<
  Record<BasicCareType, (data: unknown) => ApiCareTemplate[]>
> = {
  meal: fromMeal,
  snack: fromSnack,
  supplement: fromSupplement,
  medicine: fromMedicine,
  pad: fromPad,
  water: fromWater,
  walk: fromWalk,
  weight: fromWeight,
};

export function toApiTemplates(
  activeBasicNotes: BasicCareType[],
  activeDiseaseNotes: DiseaseCareType[],
  basicFormData: Partial<Record<BasicCareType, unknown>>,
  diseaseFormData: Partial<Record<DiseaseCareType, unknown>>,
): ApiCareTemplate[] {
  const basicTemplates = activeBasicNotes.flatMap((key) => {
    const transformer = BASIC_TRANSFORMERS[key];
    const data = basicFormData[key];
    return transformer ? transformer(data) : [];
  });

  const diseaseTemplates = activeDiseaseNotes.flatMap((key) => {
    const data = diseaseFormData[key];
    return data ? fromDisease(key, data) : [];
  });

  return [...basicTemplates, ...diseaseTemplates];
}
