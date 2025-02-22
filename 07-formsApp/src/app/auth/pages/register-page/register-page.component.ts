import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
	templateUrl: './register-page.component.html',
	styles: ``
})
export class RegisterPageComponent {
	// Services
	// private fb: FormBuilder = new FormBuilder();
	private fb: FormBuilder = inject(FormBuilder);
	private validatorsService: ValidatorsService = inject(ValidatorsService); // According to the internet
	private emailValidator: EmailValidator = inject(EmailValidator);

	public myForm: FormGroup = this.fb.group({
		name: [
			'',
			[
				Validators.required,
				Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)
			]
		],
		// email: [
		// 	'',
		// 	[
		// 		Validators.required,
		// 		Validators.pattern(this.validatorsService.emailPattern)
		// 	],
		// 	[new EmailValidator()]
		// ],
		email: [
			'',
			[
				Validators.required,
				Validators.pattern(this.validatorsService.emailPattern)
			],
			[this.emailValidator]
		],
		username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
		password: ['', [Validators.required, Validators.minLength(6)]],
		password2: ['', [Validators.required]]
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

	isValidField(field: string) {
		return this.validatorsService.isValidField(this.myForm, field);
	}

	onSubmit() {
		this.myForm.markAllAsTouched();
	}
}
