export function getAnnotations(peaks, options = {}) {
  const { fillColor = 'green', strokeColor = 'red', creationFct } = options;

  if (!peaks) return [];
  let annotations = peaks.map((peak) => {
    let annotation = {
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

function createAnnotation(annotation, peak, options = {}) {
  const { showAssignment = true, assignmentAngle = -45 } = options;
  let labels = [];
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
