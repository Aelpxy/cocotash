import * as crypto from 'crypto';

export function encryptAES(text: string, secretKey: string): { iv: string; encrypted: string } {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return { iv: iv.toString('base64'), encrypted };
}

export function decryptAES(encryptedText: string, secretKey: string, iv: string): string {
    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        Buffer.from(secretKey),
        Buffer.from(iv, 'base64'),
    );
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export function generateHMAC(message: string, secretKey: string): string {
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(message);
    return hmac.digest('hex');
}

export function validateHMAC(message: string, secretKey: string, expectedHMAC: string): boolean {
    const generatedHMAC = generateHMAC(message, secretKey);
    return generatedHMAC === expectedHMAC;
}
