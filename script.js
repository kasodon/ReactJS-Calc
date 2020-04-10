class Buttons extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    render() {
      return (
        React.createElement("button", { className: this.props.buttonClass, id: this.props.buttonId, onClick: this.props.handleClick },
        this.props.buttonText));
  
  
    }}
  
  
  
  const Display = props => {
    return (
      React.createElement("div", { id: "display" },
      React.createElement("p", { className: "history" }, props.historyDisplay),
      React.createElement("p", { className: "mainDisplay" }, props.mainDisplay)));
  
  
  
  };
  
  
  
  const numberList = [{
    decimalForm: 0,
    writtenForm: 'zero' },
  
  {
    decimalForm: 1,
    writtenForm: 'one' },
  
  {
    decimalForm: 2,
    writtenForm: 'two' },
  
  {
    decimalForm: 3,
    writtenForm: 'three' },
  
  {
    decimalForm: 4,
    writtenForm: 'four' },
  
  {
    decimalForm: 5,
    writtenForm: 'five' },
  
  {
    decimalForm: 6,
    writtenForm: 'six' },
  
  {
    decimalForm: 7,
    writtenForm: 'seven' },
  
  {
    decimalForm: 8,
    writtenForm: 'eight' },
  
  {
    decimalForm: 9,
    writtenForm: 'nine' }];
  
  
  const operatorsList = [{
    operator: '=',
    writtenOperator: 'equals' },
  
  {
    operator: '+',
    writtenOperator: 'add' },
  
  {
    operator: '-',
    writtenOperator: 'subtract' },
  
  {
    operator: '*',
    writtenOperator: 'multiply' },
  
  {
    operator: '/',
    writtenOperator: 'divide' },
  
  {
    operator: '.',
    writtenOperator: 'decimal' },
  
  {
    operator: 'clear',
    writtenOperator: 'clear' }];
  
  
  
  class App extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        history: [],
        mainDisplay: [0],
        waitingOperator: true };
  
      this.handleNumberClick = this.handleNumberClick.bind(this);
      this.handleOperatorClick = this.handleOperatorClick.bind(this);
      this.handleEqual = this.handleEqual.bind(this);
    }
  
    handleNumberClick(val) {
      let numberObject = numberList.find(key => key.writtenForm === val.target.id);
      if (this.state.mainDisplay[0] === 0 && this.state.mainDisplay[1] !== '.') {
        if (val.target.id === 'zero') {
          return this.setState({
            history: [...this.state.history],
            mainDisplay: [numberObject.decimalForm],
            waitingOperator: true });
  
  
        } else {
          return this.setState({
            history: [...this.state.history],
            mainDisplay: [numberObject.decimalForm],
            waitingOperator: true });
  
        }
      } else {
        return this.setState({
          history: [...this.state.history],
          mainDisplay: [...this.state.mainDisplay, numberObject.decimalForm],
          waitingOperator: true });
  
      }
    }
  
    handleOperatorClick(val) {
      let operatorObject = operatorsList.find(key => key.writtenOperator === val.target.id);
  
      switch (val.target.id) {
        case 'clear':
          return this.setState({
            history: [],
            mainDisplay: [0],
            waitingOperator: false });
  
        case 'equals':
          let finalCalc = [...this.state.history, ...this.state.mainDisplay];
          let result = eval(finalCalc.join(''));
          return this.setState({
            history: [],
            mainDisplay: [result],
            waitingOperator: true });
  
        case 'decimal':
          if (!this.state.mainDisplay.includes('.')) {
            return this.setState({
              history: [...this.state.history],
              mainDisplay: [...this.state.mainDisplay, operatorObject.operator],
              waitingOperator: true });
          }
          break;
        default:
          if (this.state.waitingOperator) {
            return this.setState({
              history: [...this.state.history, this.state.mainDisplay.join(''), operatorObject.operator],
              mainDisplay: [0],
              waitingOperator: false });
  
          } else {
            return this.setState({
              history: this.state.history.map((val, index) => {
                if (index < this.state.history.length - 1) {
                  return val;
                } else
                {
                  return operatorObject.operator;
                }
              }),
              mainDisplay: [0],
              waitingOperator: false });
  
          }}
  
    }

    handleEqual() {
    let twoOper = /[+\-*/]/;
    let can = [];
    let box = [...operatorsList]
    for(let i = 0; i < box.length; i++) {
      if (twoOper.test(box[i]) == true && twoOper.test(box[i + 1]) == true) {
        can.push('')
      } else {
        can.push(box[i])
      }
    }
    this.setState({ operatorsList: eval(can.join(''))}) 
  }
  
    render() {
      const BtNumbers = numberList.map(val => React.createElement(Buttons, { key: val.writtenForm, buttonId: val.writtenForm, handleClick: this.handleNumberClick, buttonClass: "number", buttonText: val.decimalForm }));
  
      const BtOperators = operatorsList.map(val => React.createElement(Buttons, { key: val.writtenOperator, buttonId: val.writtenOperator, handleClick: this.handleOperatorClick, buttonClass: "operator", buttonText: val.operator }));
      return (
        React.createElement("div", { className: "App" },
        React.createElement(Display, { historyDisplay: this.state.history, mainDisplay: this.state.mainDisplay }),
        React.createElement("div", { className: "buttons" },
        React.createElement("div", { className: "numbers" }, BtNumbers),
        React.createElement("div", { className: "operators" }, BtOperators))));
  
    }}
  
  
  
  ReactDOM.render(React.createElement(App, null), document.getElementById('root'));