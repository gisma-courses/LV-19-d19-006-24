// Soil Adjusted Vegetation Index  (abbrv. SAVI)
// General formula: (800nm - 670nm) / (800nm + 670nm + L) * (1 + L)
// URL https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=87
function setup() {
   return {
      input: ["B04", "B08", "dataMask"],
      output: { bands: 4 }
   };
}

let L = 0.428; // L = soil brightness correction factor could range from (0 -1)

const ramp = [
   [-0.5, 0x0c0c0c],
   [-0.2, 0xbfbfbf],
   [-0.1, 0xdbdbdb],
   [0, 0xeaeaea],
   [0.025, 0xfff9cc],
   [0.05, 0xede8b5],
   [0.075, 0xddd89b],
   [0.1, 0xccc682],
   [0.125, 0xbcb76b],
   [0.15, 0xafc160],
   [0.175, 0xa3cc59],
   [0.2, 0x91bf51],
   [0.25, 0x7fb247],
   [0.3, 0x70a33f],
   [0.35, 0x609635],
   [0.4, 0x4f892d],
   [0.45, 0x3f7c23],
   [0.5, 0x306d1c],
   [0.55, 0x216011],
   [0.6, 0x0f540a],
   [1, 0x004400],
];

const visualizer = new ColorRampVisualizer(ramp);

function evaluatePixel(samples) {
   const index = (samples.B08 - samples.B04) / (samples.B08 + samples.B04 + L) * (1.0 + L);
   let imgVals = visualizer.process(index);
   return imgVals.concat(samples.dataMask)
}