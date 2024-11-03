import React from 'react';
import { Container} from 'react-bootstrap';
import "../../styles/frompengunjungPage.css"

const FromPengunjung = () => { 
  return (
    <Container className="mt-5">
      <form >
        <div className="mb-3">
          <label htmlFor="nim" className="form-label">NIM</label>
          <input type="text" className="form-control" id="nim" placeholder="Masukkan NIM" />
        </div>
        <div className="mb-3">
          <label htmlFor="nama_kegiatan" className="form-label">Keperluan</label>
          <input type="text" className="form-control" id="nama_kegiatan" placeholder="Masukkan Kegiatan" />
        </div>
        <div className="text-left">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </Container>

  );
};

export default FromPengunjung;