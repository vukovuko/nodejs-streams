const { Readable } = require('stream');

class MyStream extends Readable {
    #count = 0;
    _read(size) {
        this.push(':-)');
        if (this.#count++ === 5) { this.push(null) } // Stop the stream
    }
}

const stream = new MyStream();

// stream.on('data', chunk => { // Send data all at once
//     console.log(chunk.toString());
//     stream.pause();
//     setTimeout(() => stream.resume(), 1000);
// });

stream.on('readable', () => {
    console.count('>> readable event');
    let chunk;
    while ((chunk = stream.read()) !== null) {
        console.log(chunk.toString());
    }
});

stream.on('end', () => console.log('>> end event'));
