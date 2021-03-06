const should = require('chai').should();
const {
    WKR,
    classifyRegex,
    generateData,
    isRegexType,
    wkrKeys,
    wkrAccessor
} = require('../well-known-regex');

describe('well-known-regex', ()=>{
    describe('identity', ()=>{
        wkrKeys.forEach((key)=>{
            it(`${key} recognizes itself`, ()=>{
                isRegexType(key, wkrAccessor.get(key)).should.equal(
                    true,
                    `Expected ${key} to be it's own type`
                );
            });
        });
    });

    describe('.classifyRegex()', ()=>{
        it('classifies a simple object', ()=>{
            let classified = classifyRegex({
                name : WKR.internet.userName ,
                email : WKR.internet.email ,
            }, 'en_us');
            should.exist(classified);
            Object.keys(classified).length.should.equal(2);
            classified.name.should.equal('internet.userName');
            classified.email.should.equal('internet.email');
        });
    });

    describe('.generate()', ()=>{
        it('generates a simple object', ()=>{
            let generated = generateData({
                fullName : WKR.name.fullName,
                firstName : WKR.name.firstName,
                middleName : WKR.name.middleName,
                lastName : WKR.name.lastName,
                name : WKR.internet.userName,
                email : WKR.internet.email,
                fullAddress : WKR.address.fullThreeLineAddress,
                zipCode : WKR.address.zipCode,
                city : WKR.address.city,
                stateAbbr : WKR.address.stateAbbr,
                streetAddress : WKR.address.streetAddress,
            }, { locale: 'en_us', seed: 'some_seed' });
            should.exist(generated.name);
            should.exist(generated.email);
            should.exist(generated.zipCode);
            should.exist(generated.city);
            should.exist(generated.stateAbbr);
            should.exist(generated.streetAddress);
            should.exist(generated.firstName);
            should.exist(generated.middleName);
            should.exist(generated.lastName);
            should.exist(generated.fullAddress);
            should.exist(generated.fullName);
            generated.name.should.equal("Dewitt67");
            generated.email.should.equal("Pauline_Goldner59@gmail.com");
            generated.zipCode.should.equal("31840");
            generated.city.should.equal("Jacobiside");
            generated.stateAbbr.should.equal("LA");
            generated.streetAddress.should.equal("73968 Tom Glens");
            generated.firstName.should.equal("Robb");
            generated.middleName.should.equal("a");
            generated.lastName.should.equal("Rodriguez");
            generated.fullAddress.should.equal("73968 Tom Glens\nJacobiside, LA\n31840");
            generated.fullName.should.equal("Robb a Rodriguez");
        });
    });
});
