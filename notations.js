const NOTATION = {
    scientific: function(value) {
        let exponent = value.log10().floor();
        let mantissa = value.div(new Decimal(10).pow(exponent));
        if (value == 0) return '0.00';
        if (exponent < 3) return value.toFixed(2);
        if (mantissa.toFixed(2) >= 10) { mantissa /= 10; exponent++ };
        return mantissa.toFixed(2) + 'e' + exponent;
    }
}