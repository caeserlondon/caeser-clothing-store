export const SENDER_NAME = process.env.SENDER_NAME || 'support'
export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev'

export const USER_ROLES = ['Admin', 'User']
export const COLORS = ['Gold', 'Green', 'Red']
export const THEMES = ['Light', 'Dark', 'System']

/** Category image paths for home page - add new categories here when you add products */
export const CATEGORY_IMAGES: Record<string, string> = {
	Sunglasses: '/images/sunglasses.avif',
	'Wrist Watches': '/images/wrist-watches.avif',
	Jeans: '/images/jeans.avif',
	Shirts: '/images/shirts.avif',
	Shoes: '/images/shoes.avif',
	Cufflinks: '/images/cufflinks.avif',
}
