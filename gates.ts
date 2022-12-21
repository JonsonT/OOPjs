interface IGate {
  execute(inputs: boolean[]): boolean;
}

abstract class BinaryGate implements IGate {
  execute(inputs: boolean[]): boolean {
    if (inputs.length !== 2) {
      throw new Error("Invalid number of inputs for binary gate");
    }
    return this.performLogic(inputs[0], inputs[1]);
  }

  abstract performLogic(input1: boolean, input2: boolean): boolean;
}

abstract class UnaryGate implements IGate {
  execute(inputs: boolean[]): boolean {
    if (inputs.length !== 1) {
      throw new Error("Invalid number of inputs for unary gate");
    }
    return this.performLogic(inputs[0]);
  }

  abstract performLogic(input: boolean): boolean;
}

class AndGate extends BinaryGate {
  performLogic(input1: boolean, input2: boolean): boolean {
    return input1 && input2;
  }
}

class OrGate extends BinaryGate {
  performLogic(input1: boolean, input2: boolean): boolean {
    return input1 || input2;
  }
}

class NotGate extends UnaryGate {
  performLogic(input: boolean): boolean {
    return !input;
  }
}

class NandGate extends BinaryGate {
  performLogic(input1: boolean, input2: boolean): boolean {
    return !(input1 && input2);
  }
}

// Test the NandGate
const nand = new NandGate();
console.log(nand.execute([true, true]));
console.log(nand.execute([true, false]));
console.log(nand.execute([false, false]));
