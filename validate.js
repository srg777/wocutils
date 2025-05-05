function validate(schema, data) {
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const message = parsed.error.errors.map(e => e.message).join(', ');
      throw new Error(`Validation error: ${message}`);
    }
    return parsed.data;
  }
  
  module.exports = {validate};