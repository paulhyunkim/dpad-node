// scraping.ts

import axios from 'axios';
import cheerio from 'cheerio';
import vm from 'vm';
import * as jp from 'jsonpath-plus';
import he from 'he';

interface VideoRenderer {
  videoId: string
  thumbnailOverlays: any[]
}

const scrapeLiveVideoIDs = async (channelHandles: string[]): Promise<void> => {
  for (const channelHandle of channelHandles) {
    const videoId = await scrapeLiveVideoID(channelHandle)
    if (videoId) {
      console.log(`Found live video with ID ${videoId}`)
    }
  }
}

const scrapeLiveVideoID = async (channelHandle: string): Promise<string | null> => {
  const url = `https://www.youtube.com/${channelHandle}/streams`

  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    let ytInitialData: any = null

    const context: any = { ytInitialData: null }
    vm.createContext(context)

    $('script').each((i, element) => {
      const scriptText = $(element).html()
      if (scriptText && scriptText.includes('var ytInitialData = ')) {
        const decodedScriptText = he.decode(scriptText)
        const script = new vm.Script(decodedScriptText)
        script.runInContext(context)
      }
    })

    ytInitialData = context.ytInitialData

    if (ytInitialData === null) {
      console.error("Failed to find ytInitialData in script.")
      return null
    }

    const videoRenderers = jp.JSONPath({
      path: "$..videoRenderer",
      json: ytInitialData
    })

    const filteredVideoRenderers = videoRenderers.filter((videoRenderer: VideoRenderer) => {
      const thumbnailOverlays = videoRenderer.thumbnailOverlays || []
      const hasThumbnailOverlayWithStyleLive = thumbnailOverlays.some(
        (overlay: any) => overlay?.thumbnailOverlayTimeStatusRenderer?.style === 'LIVE'
      )
    
      return thumbnailOverlays.length > 0 && hasThumbnailOverlayWithStyleLive
    })

    const firstVideoRenderer = filteredVideoRenderers[0]
    const videoId = firstVideoRenderer?.videoId || null

    return videoId
  } catch (error) {
    console.error("Error occurred while scraping live video ID:", error)
    return null
  }
}

export { scrapeLiveVideoIDs }
