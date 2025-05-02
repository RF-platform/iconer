export interface ItemData {
  Code: string;
  Name: string;
  Desc?: string;
  ItemGrade: number;
  SpriteFileName: string;
  SpriteX: number;
  SpriteY: number;
  Count: number | string;
  WeaponType?: string;
  ItemClass?: string;
  GAMinAF?: number;
  GAMaxAF?: number;
  MAMinAF?: number;
  MAMaxAF?: number;
  IsSell?: number;
  IsGround?: number;
  IsStore?: number;
  IsTime?: number;
  ActiveEffLv?: number;
  ActiveProb?: number;
  DefFc?: number | null;
  LevelLim?: number | string;
  Civil?: string;
  ExpertID1?: string;
  ExpertLim1?: string | number;
  FireTol?: number;
  WaterTol?: number;
  SoilTol?: number;
  WindTol?: number;
  ForceName?: string;
  EffectDescriptions?: string[];
  UpgradeMaxCount?: number;
  UpgradeNames?: string[];
  UpgradeDescriptions?: string[];
  IsExchange?: number;
}

export interface UpgradeEntry {
  code: string;
  upgrade: string;
}

export interface RawItemsList {
  list: UpgradeEntry[];
}
