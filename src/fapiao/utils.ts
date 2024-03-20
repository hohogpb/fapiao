export function findStartNode(
  scrollTop: number,
  rowPositions: number[],
  rowCount: number
) {
  if (rowCount == 0) {
    return 0;
  }

  let startRange = 0;
  let endRange = rowCount;
  while (endRange !== startRange) {
    // console.log(startRange, endRange);
    const middle = Math.floor((endRange - startRange) / 2 + startRange);

    if (
      rowPositions[middle] <= scrollTop &&
      rowPositions[middle + 1] > scrollTop
    ) {
      // console.log("middle", middle);
      return middle;
    }

    if (middle === startRange) {
      // edge case - start and end range are consecutive
      // console.log("endRange", endRange);
      return startRange;
    } else {
      if (rowPositions[middle] <= scrollTop) {
        startRange = middle;
      } else {
        endRange = middle;
      }
    }
  }
  return rowCount;
}

export function findEndNode(
  rowPositions: number[],
  startRow: number,
  rowCount: number,
  height: number
) {
  let endRow;
  for (endRow = startRow; endRow < rowCount; endRow++) {
    // console.log(nodePositions[endNode], nodePositions[startNode]);
    if (rowPositions[endRow] > rowPositions[startRow] + height) {
      // console.log(endNode);
      return endRow;
    }
  }
  return endRow;
}
