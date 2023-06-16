import React from 'react';
import XLSX from 'xlsx';


import { datas } from "../components/lecture/pages/AttendenceCheck";


class FileDownloadButton extends React.Component {
  handleClick = () => {
    const data = [datas];

    // xlsx 워크북 생성
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);

    // 워크북에 워크시트 추가
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

    // 워크북을 xlsx 파일로 변환
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // 파일로 저장하기 위한 Blob 생성
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // 파일 다운로드 링크 생성
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.xlsx');
    document.body.appendChild(link);
    
    // 링크 클릭하여 다운로드 시작
    link.click();

    // 다운로드 후 링크 제거
    document.body.removeChild(link);
  }

  render() {
    return (
      <button onClick={this.handleClick}>파일 다운로드</button>
    );
  }
}

export default FileDownloadButton;