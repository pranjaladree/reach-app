export class VisualAcuityModel {
  id: string;
  visualExamWithSpecsDvaLe: string;
  visualExamWithSpecsDvaRe: string;
  visualExamWithSpecsNvaLe: string;
  visualExamWithSpecsNvaRe: string;
  visualExamWithSpecsPhLe: string;
  visualExamWithSpecsPhRe: string;
  visualExamWithoutSpecsDvaLe: string;
  visualExamWithoutSpecsDvaRe: string;
  visualExamWithoutSpecsNvaLe: string;
  visualExamWithoutSpecsNvaRe: string;
  visualExamWithoutSpecsPhLe: string;
  visualExamWithoutSpecsPhRe: string;
  mrId: string;

  constructor({
    id,
    visualExamWithSpecsDvaLe,
    visualExamWithSpecsDvaRe,
    visualExamWithSpecsNvaLe,
    visualExamWithSpecsNvaRe,
    visualExamWithSpecsPhLe,
    visualExamWithSpecsPhRe,
    visualExamWithoutSpecsDvaLe,
    visualExamWithoutSpecsDvaRe,
    visualExamWithoutSpecsNvaLe,
    visualExamWithoutSpecsNvaRe,
    visualExamWithoutSpecsPhLe,
    visualExamWithoutSpecsPhRe,
    mrId,
  }: {
    id: string;
    visualExamWithSpecsDvaLe: string;
    visualExamWithSpecsDvaRe: string;
    visualExamWithSpecsNvaLe: string;
    visualExamWithSpecsNvaRe: string;
    visualExamWithSpecsPhLe: string;
    visualExamWithSpecsPhRe: string;
    visualExamWithoutSpecsDvaLe: string;
    visualExamWithoutSpecsDvaRe: string;
    visualExamWithoutSpecsNvaLe: string;
    visualExamWithoutSpecsNvaRe: string;
    visualExamWithoutSpecsPhLe: string;
    visualExamWithoutSpecsPhRe: string;
    mrId: string;
  }) {
    this.id = id;
    this.visualExamWithSpecsDvaLe = visualExamWithSpecsDvaLe;
    this.visualExamWithSpecsDvaRe = visualExamWithSpecsDvaRe;
    this.visualExamWithSpecsNvaLe = visualExamWithSpecsNvaLe;
    this.visualExamWithSpecsNvaRe = visualExamWithSpecsNvaRe;
    this.visualExamWithSpecsPhLe = visualExamWithSpecsPhLe;
    this.visualExamWithSpecsPhRe = visualExamWithSpecsPhRe;
    this.visualExamWithoutSpecsDvaLe = visualExamWithoutSpecsDvaLe;
    this.visualExamWithoutSpecsDvaRe = visualExamWithoutSpecsDvaRe;
    this.visualExamWithoutSpecsNvaLe = visualExamWithoutSpecsNvaLe;
    this.visualExamWithoutSpecsNvaRe = visualExamWithoutSpecsNvaRe;
    this.visualExamWithoutSpecsPhLe = visualExamWithoutSpecsPhLe;
    this.visualExamWithoutSpecsPhRe = visualExamWithoutSpecsPhRe;
    this.mrId = mrId;
  }
}
