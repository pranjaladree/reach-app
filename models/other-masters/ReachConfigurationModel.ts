export class ReachConfigurationModel {
  id: number;
  partnerName: string;
  partnerId: string;
  isPlus2DTest: boolean;
  isNpcTest: boolean;
  isCoverTest: boolean;
  isActive: string;

  constructor({
    id,
    partnerName,
    partnerId,
    isPlus2DTest,
    isNpcTest,
    isCoverTest,
    isActive,
  }: {
    id: number;
    partnerName: string;
    partnerId: string;
    isPlus2DTest: boolean;
    isNpcTest: boolean;
    isCoverTest: boolean;
    isActive: string;
  }) {
    this.id = id;
    this.partnerName = partnerName;
    this.partnerId = partnerId;
    this.isPlus2DTest = isPlus2DTest;
    this.isNpcTest = isNpcTest;
    this.isCoverTest = isCoverTest;
    this.isActive = isActive;
  }
}
