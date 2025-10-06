import { capitalizeWords, truncateText, normalizeText } from '../../src/formatters/text-utils';

describe('Text Utils', () => {
    describe('capitalizeWords', () => {
        it('should capitalize first letter of each word', () => {
            const result = capitalizeWords('hello world from typescript');
            expect(result).toBe('Hello World From Typescript');
        });

        it('should handle single word', () => {
            const result = capitalizeWords('hello');
            expect(result).toBe('Hello');
        });

        it('should handle empty string', () => {
            const result = capitalizeWords('');
            expect(result).toBe('');
        });

        it('should handle already capitalized words', () => {
            const result = capitalizeWords('Hello World From TypeScript');
            expect(result).toBe('Hello World From Typescript');
        });

        it('should handle mixed case', () => {
            const result = capitalizeWords('hELLo WoRLd');
            expect(result).toBe('Hello World');
        });
    });

    describe('truncateText', () => {
        it('should truncate text to specified length', () => {
            const result = truncateText('This is a very long text', 10);
            expect(result).toBe('This is...');
        });

        it('should not truncate if text is shorter than max length', () => {
            const result = truncateText('Short text', 20);
            expect(result).toBe('Short text');
        });

        it('should use custom suffix', () => {
            const result = truncateText('This is a very long text', 10, '...');
            expect(result).toBe('This is...');
        });

        it('should handle empty string', () => {
            const result = truncateText('', 10);
            expect(result).toBe('');
        });

        it('should handle zero length', () => {
            const result = truncateText('Hello', 0);
            expect(result).toBe('...');
        });

        it('should handle negative length', () => {
            const result = truncateText('Hello', -5);
            expect(result).toBe('...');
        });

        it('should handle exact length', () => {
            const result = truncateText('Hello', 5);
            expect(result).toBe('Hello');
        });
    });

    describe('normalizeText', () => {
        it('should remove extra whitespace', () => {
            const result = normalizeText('  This   text   has   extra   spaces  ');
            expect(result).toBe('This text has extra spaces');
        });

        it('should normalize line breaks', () => {
            const result = normalizeText('Text\n\n\nwith\n\n\nline\nbreaks');
            expect(result).toBe('Text with line breaks');
        });

        it('should handle mixed whitespace', () => {
            const result = normalizeText('  This   text   has   \n  \n  extra   spaces   \n  and   \n  line   breaks  ');
            expect(result).toBe('This text has extra spaces and line breaks');
        });

        it('should handle empty string', () => {
            const result = normalizeText('');
            expect(result).toBe('');
        });

        it('should handle only whitespace', () => {
            const result = normalizeText('   \n\n   ');
            expect(result).toBe('');
        });

        it('should handle single word', () => {
            const result = normalizeText('  hello  ');
            expect(result).toBe('hello');
        });
    });
});
