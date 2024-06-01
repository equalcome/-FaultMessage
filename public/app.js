document.addEventListener("DOMContentLoaded", () => {
  // 自動設定日期和時間
  let now = new Date();
  let currentDate = now.toISOString().substring(0, 10);
  let currentTime = now.toTimeString().substring(0, 5);

  // 設定通報日期和時間
  document.getElementById("notificationDate").value = currentDate;
  document.getElementById("notificationTime").value = currentTime;

  // 設定出發和抵達時間
  document.getElementById("departureTime").value = currentTime;
  document.getElementById("arrivalTime").value = currentTime;

  // 收集並顯示目前表單選項
  gatherSelections();

  // 為所有<select>和<input>元素新增事件監聽器，以便在選項變更時更新顯示的結果
  document
    .querySelectorAll("select, input[type='time'], input[type='date']")
    .forEach((element) => {
      element.addEventListener("change", gatherSelections);
    });

  // 綁定複製按鈕的點擊事件
  document.getElementById("button").addEventListener("click", function () {
    let textToCopy = document.getElementById("result").innerText;
    let tempInput = document.createElement("textarea");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("您的故障訊息為: " + textToCopy);
  });
});

function gatherSelections() {
  let selectionsText = []; //初始化一個數組

  // 收集 <select> 元素的選中選項文本
  document.querySelectorAll("select").forEach((select) => {
    let optionText = select.options[select.selectedIndex].text;
    selectionsText.push(optionText);
  });

  // 收集 <input> 元素（時間和日期）的值
  document
    .querySelectorAll('input[type="time"], input[type="date"]')
    .forEach((input) => {
      let inputValue = input.value;
      selectionsText.push(inputValue ? inputValue : "未指定");
    });

  // 将收集到的数据显示到结果区域
  document.getElementById("result").innerText = selectionsText.join("\n");
}
