import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #3B82F6 0%, #9333EA 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '24px',
        }}
      >
        <div
          style={{
            fontSize: '100px',
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'Inter',
          }}
        >
          C
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 