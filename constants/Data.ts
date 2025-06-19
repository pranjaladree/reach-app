import { DropdownModel } from "@/models/ui/DropdownModel";
import { RadioItemModel } from "@/models/ui/RadioItemModel";

export const ACTIVITY_TYPE_ITEMS = [
  new DropdownModel({
    id: "1",
    value: "PRIMARY_SCREENING",
    label: "Primary Screening",
  }),
  new DropdownModel({
    id: "2",
    value: "COMPREHENSIVE_SCREENING",
    label: "Comprehensive Screening",
  }),
  new DropdownModel({
    id: "3",
    value: "ANNUAL_FOLLOW_UP_VISIT",
    label: "Follow Up Visit",
  }),
  new DropdownModel({
    id: "4",
    value: "FOLLOW_UP_COMPREHENSIVE_SCREENING",
    label: "Follow Up Comprehensive Screening",
  }),
];

export const FACILITY_TYPES_ITEMS = [
  new DropdownModel({ id: "1", value: "HOSPITAL", label: "HOSPITAL" }),
  new DropdownModel({
    id: "2",
    value: "VISION CENTER",
    label: "VISION CENTER",
  }),
  new DropdownModel({
    id: "3",
    value: "OTHER FACILITY",
    label: "OTHER FACILITY",
  }),
];

export const YES_NO_RADIO_ITEMS = [
  new RadioItemModel({ id: 1, value: "YES", label: "YES" }),
  new RadioItemModel({ id: 2, value: "NO", label: "NO" }),
];

export const GOOD_BAD_RADIO_ITEMS = [
  new RadioItemModel({ id: 1, value: "GOOD", label: "GOOD" }),
  new RadioItemModel({ id: 2, value: "BAD", label: "BAD" }),
];

export const GENDER_RADIO_ITEMS = [
  new RadioItemModel({ id: 1, value: "MALE", label: "MALE" }),
  new RadioItemModel({ id: 2, value: "FEMALE", label: "FEMALE" }),
  new RadioItemModel({ id: 3, value: "TRANSGENDER", label: "TRANSGENDER" }),
];

export const YES_NO_DROPDOWN_ITEMS = [
  new DropdownModel({ id: "1", value: "YES", label: "YES" }),
  new DropdownModel({ id: "2", value: "NO", label: "NO" }),
];

export const NORMAL_ABNORMAL_DROPDOWN_ITEMS = [
  new DropdownModel({ id: "1", value: "NORMAL", label: "NORMAL" }),
  new DropdownModel({ id: "2", value: "ABNORMAL", label: "ABNORMAL" }),
];

export const RELATIONS_DROPDOWN_ITEMS = [
  new DropdownModel({ id: "1", value: "S/O", label: "S/O" }),
  new DropdownModel({ id: "2", value: "D/O", label: "D/O" }),
];

export const COLOR_VISION_DROPDOWN_ITEMS = [
  new DropdownModel({ id: "1", value: "0", label: "0" }),
  new DropdownModel({ id: "2", value: "1", label: "1" }),
  new DropdownModel({ id: "3", value: "2", label: "2" }),
  new DropdownModel({ id: "4", value: "3", label: "3" }),
  new DropdownModel({ id: "5", value: "4", label: "4" }),
  new DropdownModel({ id: "6", value: "5", label: "5" }),
];

export const EYE_DROPDOWN_ITEMS = [
  new DropdownModel({ id: "1", value: "LE", label: "LE" }),
  new DropdownModel({ id: "2", value: "RE", label: "RE" }),
  new DropdownModel({ id: "3", value: "BOTH", label: "BOTH" }),
];
