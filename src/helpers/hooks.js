const { useEffect } = require("react");

const useEnterKeyListener = ({ querySelectorToExecuteClick }) => {
  useEffect(() => {
    //https://stackoverflow.com/a/59147255/828184
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handlePressEnter();
      }
    };

    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const handlePressEnter = () => {
    //https://stackoverflow.com/a/54316368/828184
    const mouseClickEvents = ["mousedown", "click", "mouseup"];
    function simulateMouseClick(element) {
      mouseClickEvents.forEach((mouseEventType) =>
        element.dispatchEvent(
          new MouseEvent(mouseEventType, {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1
          })
        )
      );
    }

    var element = document.querySelector(querySelectorToExecuteClick);
    simulateMouseClick(element);
  };
};

export default useEnterKeyListener;