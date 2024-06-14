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

  // 為所有<select>、<input>和<textarea>元素新增事件監聽器，以便在選項變更時更新顯示的結果
  document
    .querySelectorAll(
      "select, input[type='time'], input[type='date'], input[type='text'], textarea"
    )
    .forEach((element) => {
      element.addEventListener("change", updateDetails);
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
    alert("您的故障訊息已複製: " + textToCopy);
  });
});

function gatherSelections() {
  let reportSelect = document.getElementById("report");
  let reportText = reportSelect.options[reportSelect.selectedIndex].text;

  let reportNumber = document.getElementById("reportNumber").value;
  let notificationTime = document.getElementById("notificationTime").value;
  let incidentDescription = document.getElementById(
    "incidentDescription"
  ).value;

  // 12小時制變成24小時制
  let [hours, minutes] = notificationTime.split(":");
  let formattedTime = `${hours}:${minutes}`;

  // 更新影響範圍詳細信息
  const delay = document.getElementById("delay").value;
  const influenceInterval = document.getElementById("influenceInterval").value;
  const simpleDescription = document.getElementById("simpleDescription").value;

  //XX股-第X報：
  const titleText = `${reportText}-第${reportNumber}報：\n`;

  // (1)事件：
  let resultText = `(1)事件：${formattedTime} ${incidentDescription}\n`;

  //(2)影響範圍：⚫
  const impactDetails = `
    (2)影響範圍：\n延誤否：${delay}\n影響區間：${influenceInterval}\n簡易敘述：${simpleDescription}`;

  // 將结果文本和影響範圍詳細信息顯示在結果區域
  document.getElementById("result").innerText =
    titleText + resultText + impactDetails;
}

function updateDetails() {
  gatherSelections();
}
