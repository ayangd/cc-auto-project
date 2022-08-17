import { existsSync, readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { resolve } from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const path = req.query.path as string[];
    const absPath = resolve(
        'lua',
        ...path.filter((p) => p !== '.' && p !== '..')
    );
    if (!existsSync(absPath)) {
        res.status(404)
            .setHeader('Content-Type', 'text/html')
            .send(
                '<!DOCTYPE html><html><head><title>Content not found</title></head><body><h2>File is not found.</h2></body></html>'
            );
        return;
    }
    const luaContent = readFileSync(absPath, { encoding: 'utf-8' });
    res.status(200).send(luaContent);
}
