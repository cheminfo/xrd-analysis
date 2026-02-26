interface AnnotationPeak {
  x: number;
  y: number;
  assignment?: string;
}

interface AnnotationOptions {
  /** Fill color for annotations. Defaults to 'green'. */
  fillColor?: string;
  /** Stroke color for annotations. Defaults to 'red'. */
  strokeColor?: string;
  /** Custom creation function applied to each annotation. */
  creationFct?: (annotation: Annotation, peak: AnnotationPeak) => void;
  /** Whether to show peak assignments. Defaults to true. */
  showAssignment?: boolean;
  /** Angle for assignment labels. Defaults to -45. */
  assignmentAngle?: number;
}

interface Annotation {
  line: number;
  type: string;
  strokeColor: string;
  strokeWidth: number;
  fillColor: string;
  labels?: Array<{
    text: string | undefined;
    size: string;
    angle: number;
    anchor: string;
    color: string;
    position: { x: number; y: number; dy: string };
  }>;
  position?: Array<{
    x: number;
    y: number;
    dy: string;
    dx: string;
  }>;
}

/**
 * Creates JSGraph-compatible annotations for visualizing peaks.
 * @param peaks - Array of peaks to annotate
 * @param options - Annotation display options
 * @returns Array of JSGraph annotation objects
 */
export function getAnnotations(
  peaks: AnnotationPeak[] | undefined | null,
  options: AnnotationOptions = {},
): Annotation[] {
  const { fillColor = 'green', strokeColor = 'red', creationFct } = options;

  if (!peaks) return [];
  const annotations = peaks.map((peak) => {
    const annotation: Annotation = {
      line: 1,
      type: 'rect',
      strokeColor,
      strokeWidth: 0,
      fillColor,
    };
    if (creationFct) {
      creationFct(annotation, peak);
    }
    createAnnotation(annotation, peak, options);
    return annotation;
  });

  return annotations;
}

function createAnnotation(
  annotation: Annotation,
  peak: AnnotationPeak,
  options: AnnotationOptions = {},
): void {
  const { showAssignment = true, assignmentAngle = -45 } = options;
  const labels: NonNullable<Annotation['labels']> = [];
  let line = 0;

  if (showAssignment) {
    labels.push({
      text: peak.assignment,
      size: '18px',
      angle: assignmentAngle,
      anchor: 'left',
      color: 'darkred',
      position: {
        x: peak.x,
        y: peak.y,
        dy: `${-15 - line * 14}px`,
      },
    });
    line++;
  }

  annotation.labels = labels;

  annotation.position = [
    {
      x: peak.x,
      y: peak.y,
      dy: '-10px',
      dx: '-1px',
    },
    {
      x: peak.x,
      y: peak.y,
      dy: '-5px',
      dx: '1px',
    },
  ];
}
