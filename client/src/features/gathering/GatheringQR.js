import QRCode from "react-qr-code";

const GatheringQR = ({ gatheringId }) => {
  const gatheringURL = `${window.location.origin}/${gatheringId}`

  return ( 
    <QRCode value={gatheringURL} />
  )
}
 
export default GatheringQR