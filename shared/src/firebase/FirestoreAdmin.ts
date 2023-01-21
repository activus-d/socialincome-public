import assert from 'assert';
import { firestore } from 'firebase-admin';
import {
	CollectionReference,
	DocumentData,
	DocumentReference,
	getFirestore,
	Query,
	QueryDocumentSnapshot,
} from 'firebase-admin/firestore';
import { App } from 'firebase-admin/lib/app';
import { AdminUser } from '../types';
import Firestore = firestore.Firestore;

export class FirestoreAdmin {
	/**
	 * direct access to the admin firestore instance. Deployed, this has full admin access to the data.
	 */
	readonly firestore: Firestore;

	constructor(app: App) {
		this.firestore = getFirestore(app);
	}

	/**
	 * Access the typed collection
	 */
	collection = <T = DocumentData>(collectionName: string): CollectionReference<T> => {
		return this.firestore.collection(collectionName) as CollectionReference<T>;
	};

	/**
	 * Access the typed document of a collection
	 */
	doc = <T = DocumentData>(collectionName: string, docId: string): DocumentReference<T> => {
		return this.collection<T>(collectionName).doc(docId);
	};

	/**
	 * Find the first document meeting the provided query
	 */
	findFirst = async <T = DocumentData>(
		collectionName: string,
		query: (col: CollectionReference<T>) => Query<T>
	): Promise<QueryDocumentSnapshot<T> | undefined> => {
		const snapshot = await query(this.collection<T>(collectionName)).get();
		return snapshot.docs.at(0);
	};

	assertGlobalAdmin = async (email?: string) => {
		assert(email);
		const admin = (await this.doc<AdminUser>('admins', email).get()).data();
		assert(admin?.is_global_admin, 'Expected is_global_admin set to true');
	};
}