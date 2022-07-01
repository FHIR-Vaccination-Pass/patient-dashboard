import { IconType } from 'react-icons';

export class AggregatedImmunizationStatus {
  status: string;
  iconColor: string;
  icon: IconType;
  backgroundColor: string;
  headline: string;
  subline: string;

  constructor(
    status: string,
    iconColor: string,
    icon: IconType,
    backgroundColor: string,
    headline: string,
    subline: string
  ) {
    this.status = status;
    this.iconColor = iconColor;
    this.icon = icon;
    this.backgroundColor = backgroundColor;
    this.headline = headline;
    this.subline = subline;
  }
}
