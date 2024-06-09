export interface Field {
  name: string;
  color: string;
  verticalLevel: number;
  isExpanded?: boolean;
  nestedFields?: Field[];
  reports?: ReportFields;
}

export interface ReportFields {
  [reportName: string]: number;
}

export interface Report {
  name: string;
}

export interface Table {
  id: number;
  fields: Field[];
  reports: Report[];
}
