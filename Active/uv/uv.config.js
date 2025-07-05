const { xor } = Ultraviolet.codec;

const uvConfig = {
    prefix: '/active/go/',
    bare: '/bare/',
    encodeUrl: xor.encode,
    decodeUrl: xor.decode,
    handler: '/active/uv/uv.handler.js',
    bundle: '/active/uv/uv.bundle.js',
    config: '/active/uv/uv.config.js',
    sw: '/active/uv/uv.sw.js',
};

self.__uv$config = uvConfig;
