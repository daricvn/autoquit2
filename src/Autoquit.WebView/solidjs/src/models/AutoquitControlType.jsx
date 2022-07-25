export const AutoquitControlType = {
    Label: 0,
    /// <summary>
    /// Return a string in format: min:max
    /// </summary>
    Range: 1,
    /// <summary>
    /// Return a number, consider to add min, max to the control, otherwise, there's no limit for the slider.
    /// </summary>
    Slider: 2,
    /// <summary>
    /// Return a string format, allow user to modify it
    /// </summary>
    TextBox: 3,
    /// <summary>
    /// Return an int, allow user to modify it
    /// </summary>
    Numeric: 4,
    /// <summary>
    /// Return value from the client should be in format: X:Y, where X is horizontal coordindate of the mouse, Y is the vertical coordinate of the mouse
    /// </summary>
    MouseCapture: 5,
    /// <summary>
    /// Return an int value that you can parse to KeyCode.
    /// </summary>
    KeyboardCapture: 6,
    /// <summary>
    /// Return a base64 image string.
    /// </summary>
    ImageCapture: 7,
    /// <summary>
    /// Return file path
    /// </summary>
    File: 8,
    /// <summary>
    /// Return a time in following format: HH:mm:ss
    /// </summary>
    Time: 9,
    /// <summary>
    /// Return 0 or 1.
    /// </summary>
    Checkbox: 10,
    /// <summary>
    /// Return multiple file path, each path seperated by a semicolon (;)
    /// </summary>
    MultipleFile: 11,
    /// <summary>
    /// Retrieve the locator of the control. Return the handle of the target control.
    /// </summary>
    ControlLocator: 12,
    /// <summary>
    /// Retrieve the locator of the control. Return the handle of the target control.
    /// </summary>
    ListItem: 13    
}