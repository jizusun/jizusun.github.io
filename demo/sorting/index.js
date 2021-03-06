/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers
  
  To read the approach, refer to the class materials at 
  https://btholt.github.io/four-semesters-of-cs/
  
  As always, you can rename describe to be xdescribe to prevent the
  unit tests from running while you're working
  
  There is no visualization mechanism for this algorithm. Use your own
  preferred method of introspection like console.log().
*/

const _done = () => {
  try {
    done()
  } catch (e) { 
    // do nothing
  }
}

const _snapshot = (nums) => {
  try {
    snapshot(nums);
  } catch (e) {
  }
}

var bubbleSort = nums => {
  do {
    var swapped = false;
    for (var i = 0; i < nums.length; i++) {
      _snapshot(nums);
      if (nums[i] > nums[i + 1]) {
        var temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  _snapshot(nums);
};

const mergeSort = nums => {
  _snapshot(nums)
  if (nums.length < 2) {
    return nums;
  }
  const length = nums.length;
  const middle = Math.floor(length / 2);
  const left = nums.slice(0, middle);
  const right = nums.slice(middle);
  
  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  
  const results = [];
  
  while (left.length && right.length) {
    
    if (left[0] <= right[0]) {
      results.push(left.shift());
    }
    else {
      results.push(right.shift());
    }
  }
  
  return results.concat(left, right);
};

var insertionSort = nums => {
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      _snapshot(nums);
      if (nums[i] < nums[j]) {
        let spliced = nums.splice(i, 1);
        nums.splice(j, 0, spliced[0]);
      }
    }
  }
  return nums;
};



// unit tests
// do not modify the below code

describe('bubble sort', function () {
  it('should sort correctly', () => {
    var nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
    bubbleSort(nums);
    expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    _done();
  });
});

describe('insertion sort', function() {
  it('should sort correctly', () => {
    var nums = [10,5,3,8,2,6,4,7,9,1];
    // var ans = mergeSort(nums);
    var ans = insertionSort(nums);
    expect(ans).toEqual([1,2,3,4,5,6,7,8,9,10]);
    _done();
  });
});



describe('merge sort', function () {
  it('should sort correctly', () => {
    var nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
    var ans = insertionSort(nums);
    expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    _done();
  });
});


