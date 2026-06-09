export default async function handler(req, res) {
  const { date, startDate, endDate } = req.query;
  
  // Vercel 환경 변수 (Environment Variables)에서 API 키를 가져옵니다.
  const apiKey = process.env.NEIS_API_KEY || '';
  const officeCode = 'J10';
  const schoolCode = '7679380';

  try {
    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=${officeCode}&SD_SCHUL_CODE=${schoolCode}`;
    
    // 환경 변수에 키가 세팅되어 있다면 추가합니다.
    if (apiKey) {
      url += `&KEY=${apiKey}`;
    }
    
    if (date) {
      url += `&MLSV_YMD=${date}`;
    } else if (startDate && endDate) {
      url += `&MLSV_FROM_YMD=${startDate}&MLSV_TO_YMD=${endDate}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 통신 실패' });
  }
}
