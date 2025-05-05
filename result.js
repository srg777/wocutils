function Ok(data) {
    return { ok: true, data };
}

function Err(error) {
    return { ok: false, error };
}
  
module.exports = { Ok, Err };