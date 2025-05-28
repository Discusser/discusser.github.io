export type TOCElem = {
  title: string;
  id: string;
};

export type TOC = Array<TOCElem | [TOCElem, TOC]>;
