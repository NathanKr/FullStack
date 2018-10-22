class Utils {
  static Switch = (array, index1, index2) => {
    const temp1 = array[index1];
    array[index1] = array[index2];
    array[index2] = temp1;
  };

  static MoveUp = (array, index) => {
    // --- index 0 is top
    let currentIndex = index;
    if (index > 0) {
      currentIndex = index - 1;
      Utils.Switch(array, index, currentIndex);
    }
    return currentIndex;
  };

  static MoveDown = (array, index) => {
    // --- index 0 is top
    let currentIndex = index;
    if (index < (array.length - 1)) {
      currentIndex =  index + 1;
      Utils.Switch(array, index,currentIndex);
    }
    return currentIndex;
  };
}

export default Utils;
